class Food{
    constructor(){
        this.image = loadImage("Milk.png")
        this.foodStock;
        this.lastFed;
    }
    getFoodStock(){
        return this.foodStock
    }
    updateFoodStock(food){
        this.foodStock = food
    }
    deductFoodStock(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1
        }
    }
    display(){
        var x = 80
        var y = 100

        imageMode(CENTER)
        image(this.image, 720, 220, 70, 70)

        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 === 0){
                  x = 80
                  y = y + 30  
                }
                image(this.image, x, y, 50, 50)
                x = x + 30
            }
        }
    }
    bedroom(){
        background(bedroom)
    }
    bathroom(){
        background(washroom)
    }
    garden(){
        background(garden)
    }
}