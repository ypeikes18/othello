// doAction, getAvailableActions, getResult, UndoAction

export default class MonteCarloSearch {

    constructor(depthToStopBranching, numNodesToCheck) {
        this.depthToStopBranching = depthToStopBranching;
        this.numNodesToCheck = numNodesToCheck;
    }

    getBestAction(node) {
        const availableActions = node.getAvailableActions()

        console.log("getBestAction", {availableActions})
        let bestScoredAction = {action: null, score: 0};
        for(let action of availableActions) {
            node.doAction(action)
            const score = this.scoreNode(node);
            console.log("getBestAction", {score})
            node.undoAction()
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
        console.log("scoreNode", {availableActions})

        const actionsToCheck = getNRandomElements(availableActions, this.getNumActionsToCheck())
        let totalResults = 0;
        for(let action of actionsToCheck) {
            console.log({action, level})
            node.doAction(action);
            const score = this.scoreNode(node, level+1)
            totalResults += score;
            console.log("scoreNode",{score, level})
            node.undoAction();
        }

        const averageResult = totalResults/actionsToCheck.length;
        console.log("scoreNode", {averageResult, actionsToCheck})
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
