export function createCategoryOptions(cube) {
    const dificulties = ['1 - Very Easy', '2 - Easy', '3 - Medium (Standard 3x3)', '4 - Intermediate', '5 - Expert', '6 - Hardcore'];

    const categoryOptions = dificulties.map(dificultiy => {
        const value = dificultiy[1];

        const option = {
            value,
            label: categories[cube.category]
        }
    })
}



 