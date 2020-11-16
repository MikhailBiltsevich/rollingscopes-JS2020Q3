export class Save {
    constructor(timer, size, idChips, moves) {
        const date = new Date();
        this.info = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        this.timer = timer;
        this.size = size;
        this.idChips = idChips;
        this.moves = moves;
    }
}