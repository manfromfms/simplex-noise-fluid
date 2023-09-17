const canvas  = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//canvas.width = Math.min(window.innerWidth, window.innerHeight)
//canvas.height = Math.min(window.innerWidth, window.innerHeight)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var scale = new Vec2(canvas.width, canvas.height)

const generateField = (size, delta, k) => {
    var result = []

    for(let x = 0; x < size.x; x++) {
        var temp = []
        for(let y = 0; y < size.y; y++) {
            //temp.push(new Vec2(Math.random() * 2 - 1, Math.random() * 2 - 1))

            temp.push(new Vec2(noise.simplex2((x / size.x + delta.x) * k.x, (y / size.y + delta.y) * k.y), noise.simplex2((x / size.x + delta.x) * k.x + 10000, (y / size.y + delta.y) * k.y)))
        }
        result.push(temp)
    }

    return result
}

const drawField = (f, step) => {
    const grid = scale.devide(f.length)

    for(let x = step/2; x < f.length; x += step) {
        for(let y = step/2; y < f[x].length; y += step) {
            const dir = f[x][y].multiply(20)

            ctx.beginPath()
            ctx.moveTo(grid.x * x, grid.y * y)
            ctx.lineTo(grid.x * x + dir.x, grid.y * y + dir.y)
            ctx.stroke()
        }
    }
}

const clearCanvas = (color) => {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const shadeCanvas = (value) => {
    ctx.fillStyle = `rgba(0,0,0,${value})`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

clearCanvas('black')

/*
var field = generateField(scale, new Vec2((Date.now() - startTime) / 1000, 0), new Vec2(2, 2))

clearCanvas()

ctx.strokeStyle = "black"
drawField(field, 30)
*/

noise.seed(Math.random())

var particles = []

var prevTime = Date.now()
var startTime = Date.now()

for(let i = 0; i < 10000; i++) {
    var startPos = new Vec2(scale.x * Math.random(), scale.y * Math.random())

    //particles.push(new Particle(`rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`, noise, startPos))

    particles.push(new Particle(i / 10000, new Vec3(0, 0, 255), noise, startPos))
}

console.log(particles)

window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    scale = new Vec2(canvas.width, canvas.height)

    clearCanvas('black')
}

setInterval(() => {

    shadeCanvas(0.01)

    const delta = new Vec3(0, 0, (Date.now() - startTime) / 3000)

    const calcParticle = (i) => {
        particles[i].calculate(scale, (Date.now() - prevTime) * 50, new Vec2(0.0008, 0.0008), delta)

        particles[i].draw(ctx, (Date.now() - prevTime) * 50)
    }

    for(let i in particles) {
        calcParticle(i)
    }

    prevTime = Date.now()
}, 16)