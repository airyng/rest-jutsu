/**
 * Метод-посредник сохраняющий в теле объекта запроса значение updated_at
 * равное текущему времени. Необходим для удобного обновления одноименного поля
 * в объекте обрабатываемой модели
 * @param {Object} model Класс обрабатываемой модели
 */
 function setUpdatedAtToModelBody (model) {
  return async function (req, res, next) {
    if (!req.body.updated_at) {
      req.body.updated_at = Date.now()
    }
    next()
  }
}

module.exports = setUpdatedAtToModelBody