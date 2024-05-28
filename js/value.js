$(document).ready(function () {
    let data = {};

    // 從 value.json 載入餐點資料
    $.getJSON("../data/value.json", function (response) {
        data = response;
        renderSearchResults();
    })

    let totalPrice = 0;
    const selectedItems = $("#selectedItems");

    // 搜尋輸入變更時更新結果
    $("#searchInput").on("input", renderSearchResults);

    // 處理已選菜單項點擊事件
    $("#searchResults").on("click", "li", function () {
        const selectedItemKey = $(this).attr("data-key");
        const selectedItem = data[selectedItemKey];
        totalPrice += selectedItem.price;
        const listItem = $("<li>").text(`${selectedItem.name}`).attr("data-key", selectedItemKey);
        selectedItems.append(listItem).listview("refresh");
        totalPrice=Math.round(totalPrice);
        $("#totalPrice").text(totalPrice);
    });

    // 處理菜單項點擊事件
    $("#selectedItems").on("click", "li", function () {
        const selectedItemKey = $(this).attr("data-key");
        const selectedItem = data[selectedItemKey];
        totalPrice -= selectedItem.price;
        $(this).remove();
        totalPrice=Math.round(totalPrice);
        $("#totalPrice").text(totalPrice);
    });

    function renderSearchResults() {
        const searchTerm = $("#searchInput").val().toLowerCase();
        const searchResults = $("#searchResults");
        searchResults.empty();
        if (searchTerm) {
            $.each(data, function (key, item) {
                if (item.name.toLowerCase().includes(searchTerm)) {
                    const listItem = $("<li>").text(`${item.name}`).attr("data-key", key);
                    searchResults.append(listItem);
                }
            });
        }
        searchResults.listview("refresh");
    }
});