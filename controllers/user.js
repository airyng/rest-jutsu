const DefaultController = require('./classes/Default')
const User = require('../models/user')
const authenticateTokenMiddleware = require('../middlewares/authenticateToken')

class UserController extends DefaultController {

  constructor (model) {
    super(model)
    this.middlewaresRelations.getItem = []
    this.middlewaresRelations.getProfile = [authenticateTokenMiddleware]
  }

  /**
   * Обработчик запроса возвращающий данные авторизованного пользователя
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
  getProfile (req, res) {
    res.json(req.user)
  }

  /**
   * Обработчик запроса возвращающий запись по переданному идентификатору
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
   async getItem (req, res) {
    if (!req.params.id) {
      res.status(400)
      return
    }

    let item
    try {
      item = await this.model
              .findById(req.params.id)
              .select('-passwordHash')
              .populate('role')
      
      if (item == null) {
        return res.status(404).json({ message: `Cannot find ${this.model.name} by given id` })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.json(item)
  }

  /**
   * Обработчик запроса возвращающий все записи
   * @param {Object} req Объект запроса
   * @param {Object} res Объект ответа
   */
   async getItems (req, res) {
    try {
      const items = await this.model
                      .find()
                      .select('-passwordHash')
                      .populate('role')
      res.json(items)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = new UserController(User)