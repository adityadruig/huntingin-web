const urlParams = new URLSearchParams(window.location.search);

$(document).ready(function () {
  $("#example").DataTable({
    responsive: true,
    autoWidth: false,
    scrollX: true,
    ajax: {
      url: `https://huntingin-api-4parxb4jgq-uc.a.run.app/api/tourism/?category=${urlParams.get("category")}&city=${urlParams.get("city")}&price=${urlParams.get("price")}`,
      dataSrc: "data",
    },
    columns: [
      {
        data: null,
        render: function () {
          return `<img src="assets/img/taman.png" height="180px" style="object-fit:cover"></img>`;
        },
      },
      { data: "place_name" },
      { data: "description" },
      { data: "city" },
      {
        data: null,
        render: function (data, type, row) {
          return `<button type="button" class="btn btn-primary rounded-pill fw-bold px-3 details-btn" data-id=${data.id} data-bs-toggle="modal" data-bs-target="#exampleModal">DETAILS</button>`;
        },
      },
    ],
  });

  $("#example tbody").on("click", "button.details-btn", function () {
    const placeId = $(this).attr("data-id");

    $.ajax({
      url: `https://huntingin-api-4parxb4jgq-uc.a.run.app/api/tourism/${placeId}`,
      method: "GET",
      success: function (response) {
        const modalBody = $("#exampleModal .modal-body");
        modalBody.find("h1").text(response.data.place_name);
        modalBody.find(".card-text").text(response.data.description);
        modalBody.find("#city").text(response.data.city);
        modalBody.find("#maps_link").attr("href", `${response.data.maps_link}`);

        $("#exampleModal").modal("show");
      },
      error: function (error) {
        console.error("Error fetching additional data:", error);
      },
    });
  });
});
