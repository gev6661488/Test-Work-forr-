const cargoList = [
    {
      id: "001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24"
    },
    {
      id: "002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26"
    }
  ];

const renderTable = (filterStatus = "all") => {
  const tableBody = document.getElementById("cargoTableBody");
  tableBody.innerHTML = "";

  cargoList
    .filter(cargo => filterStatus === "all" || cargo.status === filterStatus)
    .forEach(cargo => {
      const row = document.createElement("tr");
      row.className = getStatusClass(cargo.status);

      row.innerHTML = `
        <td>${cargo.id}</td>
        <td>${cargo.name}</td>
        <td>
          <select
            class="form-select"
            onchange="updateStatus('${cargo.id}', this.value)"
            style="background-color: ${getStatusColor(cargo.status)}">
            <option value="Ожидает отправки" style="background-color: #fff3cd; color: black;" ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
            <option value="В пути" style="background-color: #cce5ff; color: black;" ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
            <option value="Доставлен" style="background-color: #d4edda; color: black;" ${cargo.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
          </select>
        </td>
        <td>${cargo.origin}</td>
        <td>${cargo.destination}</td>
        <td>${cargo.departureDate}</td>
      `;
      tableBody.appendChild(row);
    });
};

const getStatusColor = (status) => {
  switch (status) {
    case "Ожидает отправки":
      return "#fff3cd";
    case "В пути":
      return "#cce5ff";
    case "Доставлен":
      return "#d4edda";
    default:
      return "white";
  }
};

  const updateStatus = (id, newStatus) => {
    const cargo = cargoList.find(cargo => cargo.id === id);
    const currentDate = new Date();
    const departureDate = new Date(cargo.departureDate);

    if (newStatus === "Доставлен" && departureDate > currentDate) {
      alert("Ошибка: Нельзя установить статус 'Доставлен' для будущей даты отправления.");
      renderTable();
      return;
    }

    cargo.status = newStatus;
    renderTable();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Ожидает отправки":
        return "status-awaiting";
      case "В пути":
        return "status-in-transit";
      case "Доставлен":
        return "status-delivered";
      default:
        return "";
    }
  };

  document.getElementById("addCargoForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("cargoName").value.trim();
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departureDate").value;

    if (!name || !origin || !destination || !departureDate) {
      alert("Все поля формы должны быть заполнены!");
      return;
    }

    const newCargo = {
      id: `CARGO${(cargoList.length + 1).toString().padStart(3, "0")}`,
      name,
      status: "Ожидает отправки",
      origin,
      destination,
      departureDate
    };

    cargoList.push(newCargo);
    renderTable();
    document.getElementById("addCargoForm").reset();
  });

  document.getElementById("filterStatus").addEventListener("change", (event) => {
    renderTable(event.target.value);
  });

  renderTable();