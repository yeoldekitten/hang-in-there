const { promisify } = require('util')
const giphy = require('giphy-api')('')

module.exports = (robot) => {
  robot.log('Yay, the app was loaded!')
  robot.on('pull_request.closed', async context => {
    const gif = await giphy.random({ tag: 'kitten', rating: 'g', fmt: 'json' })
    const body = `<img src="${gif.data.image_url}" width=400 />`
    const params = context.issue({ body })

    return context.github.issues.createComment(params)
  })
}
