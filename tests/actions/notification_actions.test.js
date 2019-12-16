import { resetNotifications } from '../../src/actions/notification_actions'
import { RESET_NOTIFICATIONS } from '../../src/constants/action_types'

describe('Actions/Notifications', () => {
  test('should create an action to reset notifications', () => {
    const expectedAction = {
      type: RESET_NOTIFICATIONS
    }
    expect(resetNotifications()).toEqual(expectedAction)
  })
})
