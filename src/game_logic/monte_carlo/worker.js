importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js');

self.onmessage = function(event) {
    const { node, action, depthToStopBranching, numNodesToCheck } = event.data;

    function scoreNode(node, level = 1) {
        const result = node.getResult();
        if (result !== null) {
            console.log({ level, result });
            return result;
        }
        const availableActions = node.getAvailableActions();
        const actionsToCheck = getNRandomElements(availableActions, getNumActionsToCheck(level, availableActions.length));
        let totalResults = 0;
        for (let action of actionsToCheck) {
            const copy = _.cloneDeep(node);
            copy.doAction(action);
            const score = scoreNode(copy, level + 1);
            totalResults += score;
        }

        const averageResult = totalResults / actionsToCheck.length;
        return averageResult;
    }

    function getNumActionsToCheck(level, numActions) {
        if (level < depthToStopBranching) {
            return numActions;
        } else if (level === depthToStopBranching) {
            return numNodesToCheck;
        } else {
            return 1;
        }
    }

    const getNRandomElements = (arr, numElements) => {
        if (numElements >= arr.length) {
            return [...arr];
        }
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numElements);
    };

    const copy = _.cloneDeep(node);
    copy.doAction(action);
    const score = scoreNode(copy, 1);

    self.postMessage(score);
};
