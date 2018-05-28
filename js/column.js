function Column(id, name) {
  const self = this;
  this.id = id;
  this.name = name || 'No name given';
  this.$element = createColumn();

  function createColumn() {
    var column = $('<div class="column"></div>');
    var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
    var columnCardList = $('<ul class="card-list"></ul>');
    var columnDelete = $('<button class="btn-delete">x</button>');
    var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');

    columnDelete.click(function () {
      self.deleteColumn();
    });

    columnAddCard.click(function (event) {
      let cardName = prompt('Enter the name of the card');
      event.preventDefault();
      $.ajax({
        url: baseUrl + '/card',
        method: 'POST',
        data: {
          name: cardName,
          bootcamp_kanban_column_id: self.id
        },
        success: function (response) {
          const card = new Card(response.id, cardName);
          self.createCard(card);
        }
      });
    });

    column.append(columnTitle)
    column.append(columnDelete)
    column.append(columnAddCard)
    column.append(columnCardList);
    return column;
  }
}

Column.prototype = {
  createCard: function (card) {
    this.$element.children('ul').append(card.element);
  },
  deleteColumn: function () {
    const self = this;
    $.ajax({
      url: baseUrl + '/column/' + self.id,
      method: 'DELETE',
      success: function (response) {
        self.$element.remove();
      }
    });
  }
};