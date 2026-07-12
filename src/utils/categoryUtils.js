export function createCategoryOptions(cube) {
    const difficulties = ['1 - Very Easy', '2 - Easy', '3 - Medium (Standard 3x3)', '4 - Intermediate', '5 - Expert', '6 - Hardcore'];
 
    const difficultyOptions = difficulties.map(difficultiy => {
        const value = Number(difficultiy[0]);

        const option = {
            value,
            label: difficultiy,
            selected: cube.difficultyLevel === value
        }
        return option
    });

    return difficultyOptions;
};



 