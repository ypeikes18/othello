export default class GameTreeNode {

    constructor(board) {
        this.board = board;
        this.parent = undefined;
        this.children = []
    }

    createChild(coordinate, color) {
        const child = new GameTreeNode();
        child.parent = this;
        this.children.push(child);
    }

    createAllChildNodes() {
        
    }

}