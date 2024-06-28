export default class MonteCarloSearch {

    constructor(depthToStopBranching, numNodesToCheck) {
        this.depthToStopBranching = depthToStopBranching;
        this.numNodesToCheck = numNodesToCheck;
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

this.onmessage=function(response){
    const searcher = MonteCarloSearch(2,5);
    this.postMessage({action: response.action, score: searcher.scoreNode(response.node)});
}