
document.getElementById("search-button").addEventListener("click", function() {
    const searchQuery = document.getElementById("search-input").value.trim().toLowerCase();

    if (!searchQuery) {
        alert("Please enter a Pokémon name or ID.");
        return;
    }

    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchQuery}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            updateUI(data);
        })
        .catch(error => {
            alert(error.message);
        });
});

function updateUI(data) {
    document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
    document.getElementById("pokemon-id").textContent = `#${data.id}`;
    document.getElementById("weight").textContent = data.weight;
    document.getElementById("height").textContent = data.height;
    document.getElementById("hp").textContent = data.stats[0].base_stat;
    document.getElementById("attack").textContent = data.stats[1].base_stat;
    document.getElementById("defense").textContent = data.stats[2].base_stat;
    document.getElementById("special-attack").textContent = data.stats[3].base_stat;
    document.getElementById("special-defense").textContent = data.stats[4].base_stat;
    document.getElementById("speed").textContent = data.stats[5].base_stat;

    const spriteElement = document.getElementById("sprite");
    spriteElement.src = data.sprites.front_default;
    spriteElement.alt = data.name;

    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = "";

    data.types.forEach(typeObj => {
        const typeSpan = document.createElement("span");
        typeSpan.textContent = typeObj.type.name.toUpperCase();
        typeSpan.style.marginRight = "10px";
        typeSpan.style.fontWeight = "bold";
        typesContainer.appendChild(typeSpan);
    });
}
