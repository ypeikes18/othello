// doAction, getAvailableActions, getResult, UndoAction

class MonteCarloSearch {

    constructor() {
        this.depthToStopBranching = this.depthToStopBranching;
        this.numNodesToCheck = this.numNodesToCheck;
    }

    search(root, level=1) {
        availableActions = root.getAvailableActions()
        numberOfavailableActions = availableActions.length
        if(numberOfavailableActions === 0){
            return root.result()
        }
        totalResults = 0
        for(const action in getNRandomElements(availableActions, getNumNodesToCheck())) {
            root.doAction(action)
            totalResults += this.search(root, level+1)
            root.undoAction()
        }
    
        averageResult = totalResults/numberOfavailableActions
        return averageResult
    }

    getNumNodesToCheck(level, numActions) {
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