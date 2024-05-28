$(document).ready(function() {
    $.getJSON('../data/(fix)intro.json', function(data) {
        var menuContainer = $('#menu-container');
        
        var type_name = {
            "breakfast": "早餐",
            "extra-value-meals": "超值全餐(單點)",
            "mccafe": "McCafe",
            "beverages": "飲料",
            "snacks": "點心"
        };

        $.each(data, function(category, items) {
            var categoryTitle = $('<div class="type-intro"></div>');
            var titleContainer = $('<div class="title-container" style="display: flex; justify-content: space-between; align-items: center;"></div>');
            var title = $('<h2 style="display: inline;"></h2>').text(type_name[category]);

            titleContainer.append(title);

            if (category === "breakfast" || category === "extra-value-meals") {
                let itemId = 'popup_' + category;
                let popupButton = $('<a href="../page/combo.html" class="ui-btn combo_btn" style="height: 40px; line-height: 40px; padding: 0 20px;">查看配餐</a>');
                titleContainer.append(popupButton);
            }

            categoryTitle.append(titleContainer);
            menuContainer.append(categoryTitle);

            var gridbox = $('<div></div>').addClass('type-container');

            $.each(items, function(key, item) {
                var itemId = 'popup_' + category + '_' + key;
                var itemContainer = $('<a href="#' + itemId + '" data-rel="popup" class="ui-btn"></a>').addClass('popup-button');
                var popupIntro = $('<div data-role="popup" id="' + itemId + '" class="ui-content"></div>');
                var itemName = $('<h4></h4>').text(item.name).addClass('name-intro');
                var itemPrice = $('<p></p>').addClass('price-intro').text('NT$' + item.price);
                var itemIngredients = $('<p></p>').text('成分: ' + item.ingredient.join(', '));
                popupIntro.append(itemName.clone(), itemIngredients);
                itemContainer.append(itemName, itemPrice);
                gridbox.append(itemContainer);
                menuContainer.append(popupIntro);
            });

            menuContainer.append(gridbox);
        });

        $(menuContainer).enhanceWithin();
    });
});
