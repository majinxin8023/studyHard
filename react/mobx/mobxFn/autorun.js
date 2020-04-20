import Reaction from './reaction'
let autorun = (handler) => {
    Reaction.start(handler)
    handler()
    Reaction.end()
}
export default autorun