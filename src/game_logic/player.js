import {WHITE, BLACK, HUMAN, AI} from "./constants";
import MonteCarloSearch from "./monte_carlo";
import _ from "lodash"; 

export class Player {

    constructor(color, type) {
        this.color = color;
        this.type = type;
    }

    isAI() {
        return this.type === AI
    };

    isHuman() {
        return this.type === HUMAN;
    }

    getMove(game) {
        if (this.type !== AI) {
            throw new Error('Can not generate move for human players');
        }
        console.log({getMove: game})
        const searcher = new MonteCarloSearch(3,8);
        console.log({getMove: "", searcher})
        return searcher.getBestAction(_.cloneDeep(game))
    }

}
