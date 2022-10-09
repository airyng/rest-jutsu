class BaseController {
  // Структура взаимосвязи методов с посредниками
  // ключ - имя вызываемого метода
  // значение - массив посредников, которые должны вызваться перед ключевым колбеком
  middlewaresRelations = {}

  /**
   * Метод формирующий цепочку обработчиков запроса в виде массива.
   * Первыми методами подставляются "посредники", которые связаны с основным обработчиком запроса - последним элементом массива
   * @param {String} methodName Название метода, который должен обработать запрос
   * @returns {Array} Массив методов, которые будут выполняться последовательно для корректной обработки запроса
   */
  do (methodName) {
    if (typeof this[methodName] !== 'function') throw new Error('Given value isn\'t an existent function name')

    const methodsChain = []

    if (this.middlewaresRelations[methodName]?.length) {
      this.middlewaresRelations[methodName].map(getMiddleware => {
        if (typeof getMiddleware === 'function') {
          methodsChain.push(getMiddleware(this.model))
        }
      })
    }
    methodsChain.push(this[methodName].bind(this))

    return methodsChain
  }
}

module.exports = BaseController