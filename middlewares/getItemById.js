/**
 * Метод-посредник сохраняющий в объекте ответа экземпляр модели найденной по переданному id
 * @param {Object} model Класс обрабатываемой модели
 */
function getItemById (model) {
  return async function (req, res, next) {
    if (!req.params.id) { return }

    let item
    try {
      item = await model.findById(req.params.id)
      if (item == null) {
        return res.status(404).json({ message: `Cannot find ${model.name} by given id` })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }

    res.item = item
    next()
  }
}

module.exports = getItemById