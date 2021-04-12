import { FetchHistory } from '.';

export default class GenderRepository {
    static instance = null;
    static items = [];

    static GetItems = () => {
        if (!this.items.length)
            this.items = FetchHistory();

        return this.items;
    }

    static AddItem = (item) => { 
        this.items = this.items.unshift(item);
    };

    static ClearItems = () => this.items = [];

    static Instance() {
        if (GenderRepository.instance == null)
            GenderRepository.instance = this;  
         
        return this.instance;
    }
}