enum RadioMessage {
    stop_right = 5365,
    forward = 16348,
    backward = 28651,
    turn_left = 34092,
    turn_right = 37526,
    stable = 14175,
    counter_left_foot = 48127,
    left_foot = 26870,
    counter_right_foot = 18792,
    right_foot = 23015,
    left = 14947,
    right = 32391,
    message1 = 49434,
    stop_left = 35459
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    if (counter == 0) {
        counter = 1
    } else {
        counter = 0
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    on_1 = on_1 + 1
    if (on_1 == 1) {
        radio.sendMessage(RadioMessage.left)
    } else {
        on_1 = 0
        radio.sendMessage(RadioMessage.stop_left)
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    on_2 = on_2 + 1
    if (on_2 == 1) {
        radio.sendMessage(RadioMessage.right)
    } else {
        on_2 = 0
        radio.sendMessage(RadioMessage.stop_right)
    }
})
let counter = 0
let on_2 = 0
let on_1 = 0
joystickbit.initJoystickBit()
radio.setGroup(88)
on_1 = 0
on_2 = 0
counter = 0
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        if (counter == 1) {
            radio.sendMessage(RadioMessage.counter_left_foot)
        } else {
            radio.sendMessage(RadioMessage.left_foot)
        }
    } else {
        radio.sendMessage(RadioMessage.stable)
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.B)) {
        if (counter == 1) {
            radio.sendMessage(RadioMessage.counter_right_foot)
        } else {
            radio.sendMessage(RadioMessage.right_foot)
        }
    } else {
        radio.sendMessage(RadioMessage.stable)
    }
})
basic.forever(function () {
    if (joystickbit.getRockerValue(joystickbit.rockerType.Y) > 680) {
        radio.sendMessage(RadioMessage.forward)
    } else if (joystickbit.getRockerValue(joystickbit.rockerType.Y) < 150) {
        radio.sendMessage(RadioMessage.backward)
    } else if (joystickbit.getRockerValue(joystickbit.rockerType.X) > 680) {
        radio.sendMessage(RadioMessage.turn_left)
    } else if (joystickbit.getRockerValue(joystickbit.rockerType.X) < 150) {
        radio.sendMessage(RadioMessage.turn_right)
    } else {
        radio.sendMessage(RadioMessage.stable)
    }
})
