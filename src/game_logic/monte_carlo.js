// doAction, getAvailableActions, getResult, UndoAction
import _ from "lodash"; 

export default class MonteCarloSearch {

    constructor(depthToStopBranching, numNodesToCheck) {
        this.depthToStopBranching = depthToStopBranching;
        this.numNodesToCheck = numNodesToCheck;
    }

    getBestAction(node) {
        const availableActions = node.getAvailableActions()

        let bestScoredAction = {action: null, score: 0};
        for(let action of availableActions) {
            const copy = _.cloneDeep(node)
            copy.doAction(action)
            const score = this.scoreNode(copy);
            if (score > bestScoredAction.score) {
                bestScoredAction = {action, score}
            }
        }
        return bestScoredAction.action
    }

    scoreNode(node, level=1) {
        const result = node.getResult()
        if(result !== null){
            return result;
        }
        const availableActions = node.getAvailableActions()

        const actionsToCheck = getNRandomElements(availableActions, this.getNumActionsToCheck())
        let totalResults = 0;
        for(let action of actionsToCheck) {
            const copy = _.cloneDeep(node)
            try {
                copy.doAction(action);
            } catch {
                console.log({availableActions, level, grid: node.board.grid, action, edges: node.board.edges})
                debugger
            }
            const score = this.scoreNode(copy, level+1)
            totalResults += score;
        }

        const averageResult = totalResults/actionsToCheck.length;
        return averageResult;
    }

    getNumActionsToCheck(level, numActions) {
        if(level < this.depthToStopBranching){
            return numActions;
        } else if(level === this.depthToStopBranching){
            return this.numNodesToCheck;
        } else {
            return 1
        }
    }
}

// suboptimal 
const getNRandomElements = (arr, numElements) => {
    if(numElements === arr.length) {
        return [...arr]
    }
    if(numElements === 1) {
        return [arr[Math.floor(Math.random() * arr.length)]]
    } 
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
}
