$(document).on('pageinit', '#draw', function() {
    function drawMeal(type, resultDiv, nameDiv, priceDiv, ingredientDiv, listDiv) {

        $.getJSON('../data/(fix)draw.json', function(menu) {
            var items = menu[type];
            if (items) {
                var keys = Object.keys(items);
                var randomKey = keys[Math.floor(Math.random() * keys.length)];
                var meal = items[randomKey];

                $(nameDiv).text(meal.name);
                $(priceDiv).text('NT$' + meal.price);
                $(listDiv).empty();
                meal.ingredient.forEach(function(ingredient) {
                    $(listDiv).append('<li>' + ingredient + '</li>');
                });
                $(ingredientDiv).show();
            }
        });
    }

    function clearMeal(nameDiv, priceDiv, ingredientDiv, listDiv) {
        $(nameDiv).text('');
        $(priceDiv).text('');
        $(listDiv).empty();
        $(ingredientDiv).hide();
    }

    $('#drawAllBtn').click(function() {
        var isBreakfast = $('#isBreakfast').val() === 'yes';
        for (let index = 0; index < 3; index++) {
            if (isBreakfast) {
                drawMeal('breakfast', '#mainDrawResult', '#mainMealName', '#mainMealPrice', '#mainMealIngredient', '#mainIngredientList');
                drawMeal('beverages', '#drinkDrawResult', '#drinkMealName', '#drinkMealPrice', '#drinkMealIngredient', '#drinkIngredientList');
                drawMeal('snacks-bf', '#snackDrawResult', '#snackMealName', '#snackMealPrice', '#snackMealIngredient', '#snackIngredientList');
            }
            else{
                drawMeal('extra-value-meals', '#mainDrawResult', '#mainMealName', '#mainMealPrice', '#mainMealIngredient', '#mainIngredientList');
                drawMeal('beverages', '#drinkDrawResult', '#drinkMealName', '#drinkMealPrice', '#drinkMealIngredient', '#drinkIngredientList');
                drawMeal('snacks', '#snackDrawResult', '#snackMealName', '#snackMealPrice', '#snackMealIngredient', '#snackIngredientList');
            }
        }
    });

    $('#clearAllBtn').click(function() {
        clearMeal('#mainMealName', '#mainMealPrice', '#mainMealIngredient', '#mainIngredientList');
        clearMeal('#drinkMealName', '#drinkMealPrice', '#drinkMealIngredient', '#drinkIngredientList');
        clearMeal('#snackMealName', '#snackMealPrice', '#snackMealIngredient', '#snackIngredientList');
    });

    $('#drawMainBtn').click(function() {
        var isBreakfast = $('#isBreakfast').val() === 'yes';
        for (let index = 0; index < 5; index++) {
            if (isBreakfast)
                drawMeal('breakfast', '#mainDrawResult', '#mainMealName', '#mainMealPrice', '#mainMealIngredient', '#mainIngredientList');
            else
                drawMeal('extra-value-meals', '#mainDrawResult', '#mainMealName', '#mainMealPrice', '#mainMealIngredient', '#mainIngredientList');
        }
    });

    $('#clearMainBtn').click(function() {
        clearMeal('#mainMealName', '#mainMealPrice', '#mainMealIngredient', '#mainIngredientList');
    });

    $('#drawDrinkBtn').click(function() {
        for (let index = 0; index < 5; index++) {
            drawMeal('beverages', '#drinkDrawResult', '#drinkMealName', '#drinkMealPrice', '#drinkMealIngredient', '#drinkIngredientList');
        }
    });

    $('#clearDrinkBtn').click(function() {
        clearMeal('#drinkMealName', '#drinkMealPrice', '#drinkMealIngredient', '#drinkIngredientList');
    });

    $('#drawSnackBtn').click(function() {
        var isBreakfast = $('#isBreakfast').val() === 'yes';
        for (let index = 0; index < 5; index++) {
            if (isBreakfast)
                drawMeal('snacks-bf', '#snackDrawResult', '#snackMealName', '#snackMealPrice', '#snackMealIngredient', '#snackIngredientList');
            else
                drawMeal('snacks', '#snackDrawResult', '#snackMealName', '#snackMealPrice', '#snackMealIngredient', '#snackIngredientList');
        }
    });

    $('#clearSnackBtn').click(function() {
        clearMeal('#snackMealName', '#snackMealPrice', '#snackMealIngredient', '#snackIngredientList');
    });
});
