const Element = require('./Element');

class List {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    prepend(data) {
        const newElement = new Element(data);
        if (this.head === null) {
            this.head = newElement;
            this.tail = newElement;
        } else {
            newElement.next = this.head;
            this.head = newElement;
        }
        this.length++;
    }

    popFront() {
        if (this.head === null) {
            throw new Error("Cannot pop from an empty list");
        }
        const removedData = this.head.data;
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.length--;
        return removedData;
    }

    append(data) {
        const newElement = new Element(data);
        if (this.tail === null) {
            this.head = newElement;
            this.tail = newElement;
        } else {
            this.tail.next = newElement;
            this.tail = newElement;
        }
        this.length++;
    }

    popBack() {
        if (this.tail === null) {
            throw new Error("Cannot pop from an empty list");
        }
        if (this.head === this.tail) {
            const removedData = this.tail.data;
            this.head = null;
            this.tail = null;
            this.length--;
            return removedData;
        }
        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next;
        }
        const removedData = this.tail.data;
        this.tail = current;
        this.tail.next = null;
        this.length--;
        return removedData;
    }

    getAll() {
        const elements = [];
        let current = this.head;
        while (current !== null) {
            elements.push(current.data);
            current = current.next;
        }
        return elements;
    }

    insertAt(index, data) {
        if (index < 0 || index > this.length) {
            throw new Error("Index out of bounds");
        }
        if (index === 0) {
            this.prepend(data);
        } else if (index === this.length) {
            this.append(data);
        } else {
            const newElement = new Element(data);
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            newElement.next = current.next;
            current.next = newElement;
            this.length++;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.length) {
            throw new Error("Index out of bounds");
        }
        if (index === 0) {
            return this.popFront();
        } else if (index === this.length - 1) {
            return this.popBack();
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            const removedData = current.next.data;
            current.next = current.next.next;
            this.length--;
            return removedData;
        }
    }
}

module.exports = List;