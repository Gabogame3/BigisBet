import _ from 'lodash'
import { logger } from './Logging'

export function popup(title, message, btns, hasNoShow) {
    let $modal = $('<div/>').dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        draggable: false,
        title,
        buttons: getButtons(btns, hasNoShow)
    }).append($('<span/>').wiki(message)).attr('id', 'modalWarning')

    if (hasNoShow)
        $('.ui-dialog-buttonset').after($('<label/>').wiki(`Do not show again`).css('margin-left', '10px').css('cursor', 'pointer').prepend($('<input id="noShow" type="checkbox"/>').css('margin-top', '20px')))

    return $modal
}

function getButtons(btns, hasNoShow) {
    let buttons = {}
    _.forEach(btns, (value, key) => {
        buttons[key] = () => {
            if (value) {
                logger(`In button`)
                if (hasNoShow)
                    setNoShow(hasNoShow)
                value()
            }
            $('#modalWarning').dialog("destroy")
        }
    })

    return buttons
}

function setNoShow(setting) {
    logger(`In noshow`)
    variables().settings[setting.type][setting.name] = !$('#noShow').prop('checked')
}