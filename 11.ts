class Cpu {
    startUp() { console.log('打开CPU') }
    shutDown() { console.log('关闭CPU') }
}

class Memory {
    startUp() { console.log('打开内存') }
    shutDown() { console.log('关闭内存') }
}

class Disk {
    startUp() { console.log('打开硬盘') }
    shutDown() { console.log('关闭硬盘') }
}

class Computer {
    cpu;
    memory;
    disk;
    constructor() {
        this.cpu = new Cpu();
        this.memory = new Memory();
        this.disk = new Disk();
    }

    startUp() {
        this.cpu.startUp();
        this.memory.startUp();
        this.disk.startUp();
    }

    shutDown() {
        this.cpu.shutDown();
        this.memory.shutDown();
        this.disk.shutDown();
    }
}

const computer = new Computer();
computer.startUp(); // 开机
computer.shutDown(); // 关机
