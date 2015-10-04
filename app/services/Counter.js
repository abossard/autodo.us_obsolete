export default function Counter() {
    console.log('CREATE SERVICE INSTANCE');
    this.counter = 0;
    this.getCount = function() {
        this.counter += 1;
        return this.counter;
    }
}