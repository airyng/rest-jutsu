
class BaseController {
  /**
   * Возвращает функцию с переданным именем, к которой привязан контекст собственного объекта
   * @param {String} funcName Наименование функции, которую нужно вернуть
   * @returns {Function}
   */
  endpoint (funcName) {
    return this[funcName].bind(this)
  }
}

module.exports = BaseController