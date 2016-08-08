const closeMixin = require('./close');

let shortcut = {};

function close(index) {
  closeMixin(index);
};

function closeAll(list) {
  closeMixin(list, true);
}

shortcut = {
  close:close,
  closeAll: closeAll
}

module.exports = shortcut;
