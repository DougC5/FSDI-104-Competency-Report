
//104 Competency Report

/* Simulate an inventory management system where you can receive the following products:
- Desktops
- Laptops

Use classes and objects.
The system must store the items and inventory, the user must be able to consult the items in the inventory, add an item, and remove an item.

For storing the objects research the array type, it will help store the objects, you will need cycles to cycle through the array for a search.

Only simulation is needed, similar to the example of a item basket I shared with you guys where in the last lines of code outside the classes I added items and calculated the total.*/

let userInput;
let fullList;

function lapOrDesk(list, i){
    let x;
    if (list[i][2] === 'true' || list[i][2] === 'false' ) {
        x = 'Desktop';
    }else {
        x = 'Laptop';
    }
    return x;
}

function mainMenu (inventory){
    userInput = parseInt(prompt('In Stock:\n\n' + inventory + '\nPress "1" to check out equipment\nPress "2" to return equipment to the warehouse\nPress "3" to Quit'));
    addOrCheckout(userInput, inventory);
}

function addOrCheckout (input, inventory){
    if (userInput === 1 || userInput === 2 || userInput === 3){

        if (input === 1){
            let out = prompt('In Stock:\n\n' + inventory + '\nEnter the number of the equipment you would like to check out');
            out = out - 1;
            let outBrand = fullList[out][0];
            let outQty = fullList[out][1];
            fullList = warehouse.checkOut(out, outBrand, outQty);
            mainMenu(warehouse.printInv(fullList));

        } else if (input === 2) {
            userInput = parseInt(prompt('Input "1" if you are returning a laptop\nInput "2" if you are returning a desktop '));

            if (userInput === 1) {
                let brand = prompt('Enter the Brand of the laptop');
                let qty = prompt('Enter the number of laptops you are returning');
                let screenSize = prompt('Enter the screen size of the laptop you are returning');

                warehouse.add(brand, qty, screenSize);
                fullList = warehouse.list;
                mainMenu(warehouse.printInv(fullList));
            }
            if (userInput === 2) {
                let brand = prompt('Enter the Brand of the desktop');
                let qty = prompt('Enter the number of desktops you are returning');
                let hdmi = prompt('Enter "true" if the computer has a HDMI, or "false" if it does not');

                warehouse.add(brand, qty, hdmi);
                fullList = warehouse.list;
                mainMenu(warehouse.printInv(fullList));
            }

            else {
                mainMenu();
            }

        }else if (userInput === 3) {
            return;
        }


    } else {
        alert('Please enter the number 1, 2 or 3');
        mainMenu();
    }
}

class Computer {
    constructor(brand, qty) {
        this.brand = brand;
        this.qty = qty;
    }
}

class Laptops extends Computer {
    constructor(brand, qty, screenSize) {
        super(brand, qty);
        this.screenSize = screenSize;

    }
}

class Desktops extends Computer{
    constructor(brand, qty, hdmi) {
        super(brand,qty);
        this.hdmi = hdmi;
    }
}

class Warehouse {
    constructor() {
        this.list =[];
    }
    add(brand, qty, hdmi) {

        this.list.push([brand, qty, hdmi]);
        return this.list;
    }
    printInv(list){
        let menuList = [];
        for (var i = 0; i < fullList.length; i++) {
            menuList = menuList + `#${i+1} - (${list[i][1]}) ${list[i][0]} ${lapOrDesk(list, i)}(s) \n`;

        }
        return menuList;
    }
    checkOut(out, outBrand, outQty){
        this.list.splice(out, 1);
        alert('You have checked out ' + outQty + ' ' + outBrand + '(s)');
        return this.list;
    }

}

const desk1 = new Desktops('dell', 3, 'true');
const lap1 = new Laptops('HP', 2, 14);
const warehouse = new Warehouse();

warehouse.add(desk1.brand ,desk1.qty, desk1.hdmi);
warehouse.add(lap1.brand ,lap1.qty, lap1.screenSize);

fullList = warehouse.list;

console.table(fullList);
console.log(warehouse.printInv(fullList));
mainMenu(warehouse.printInv(fullList));
