class Particle {
    constructor(index, color, perlin, position, velocity) {
        this.color = color
        this.perlin = perlin
        this.pos = position ? position : new Vec2(0, 0)
        this.vel = velocity ? velocity : new Vec2(0, 0)

        this.prevPos = new Vec2(this.pos.x, this.pos.y)

        this.index = index
    }

    calculate(size, time, k, delta) {
        this.prevPos = new Vec2(this.pos.x, this.pos.y)

        this.vel.addEq(new Vec2(this.perlin.simplex3((this.pos.x) * k.x + delta.x, (this.pos.y) * k.y + delta.y, delta.z), this.perlin.simplex3((this.pos.x) * k.x + delta.x + 10000, (this.pos.y) * k.y + delta.y, delta.z)).multiply(time / 1000))

        if(this.vel.getLength() > 10) {
            this.vel.normalize()
            this.vel.multiplyEq(10)
        }

        this.pos.addEq(this.vel.multiply(time / 1000))

        this.pos.x = (this.pos.x + size.x) % size.x
        this.pos.y = (this.pos.y + size.y) % size.y

        if(this.pos.subtract(this.prevPos).getLength() > Math.min(size.x, size.y) / 2) this.prevPos = new Vec2(this.pos.x, this.pos.y)
    }

    calcColor(time) {
        const result = new Vec3(this.perlin.simplex2(time / 10000 + this.index, 0) * 360, this.perlin.simplex2(time / 10000 + 1000 + this.index, 0) * 100, this.perlin.simplex2(time / 10000 + 2000 + this.index, 0) * 100)

        return `rgb(0,0,255)`
    }

    draw(_ctx, time) {
        /*_ctx.beginPath()
        _ctx.arc(this.pos.x, this.pos.y, 1, 0, 2 * Math.PI)
        _ctx.fillStyle = this.color
        _ctx.fill()*/

        _ctx.strokeStyle = this.calcColor(time)

        _ctx.beginPath()
        _ctx.moveTo(this.prevPos.x, this.prevPos.y)
        _ctx.lineTo(this.pos.x, this.pos.y)
        _ctx.stroke()
    }
}