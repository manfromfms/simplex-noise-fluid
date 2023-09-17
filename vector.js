class Vec2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    multiply(num) {
        return new Vec2(this.x * num, this.y * num)
    }

    devide(num) {
        return new Vec2(this.x / num, this.y / num)
    }

    addEq(vec) {
        this.x += vec.x
        this.y += vec.y

        return this
    }

    devideEq(num) {
        this.x /= num
        this.y /= num

        return this
    }

    multiplyEq(num) {
        this.x *= num
        this.y *= num

        return this
    }

    getLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    normalize() {
        length = this.getLength()

        return this.devideEq(length)
    }

    subtract(vec) {
        return new Vec2(this.x - vec.x, this.y - vec.y)
    }
}

class Vec3 {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    copy() {
        return new Vec3(this.x, this.y, this.z)
    }
}