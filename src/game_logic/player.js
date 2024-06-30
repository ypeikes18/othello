import {WHITE, BLACK, HUMAN, AI} from "./constants.js";
import MonteCarloSearch from "./monte_carlo.js";
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
        const searcher = new MonteCarloSearch(2,5);
        return searcher.getBestAction(_.cloneDeep(game))
    }

}
