import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  function handleChanges(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChanges({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };

    handleChanges({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handleIngredientDelete(id) {
    handleChanges({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  }

  const { name, cookTime, servings, instructions, ingredients } = recipe;
  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          onClick={() => handleRecipeSelect(undefined)}
          className="btn recipe-edit__remove-button"
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => {
            handleChanges({ name: e.target.value });
          }}
          className="recipe-edit__input"
        />
        <label htmlFor="cookTime" className="recipe-edit__label">
          Cook Time
        </label>
        <input
          type="text"
          name="cookTime"
          id="cookTime"
          value={cookTime}
          onChange={(e) => {
            handleChanges({ cookTime: e.target.value });
          }}
          className="recipe-edit__input"
        />
        <label htmlFor="servings" className="recipe-edit__label">
          Servings  
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={servings}
          onChange={(e) => {
            handleChanges({ servings: parseInt(e.target.value) || "" });
          }}
          className="recipe-edit__input"
        />
        <label htmlFor="instructions" className="recipe-edit__label">
          Instructions
        </label>
        <textarea
          name="instructions"
          id="instructions"
          value={instructions}
          onChange={(e) => {
            handleChanges({ instructions: e.target.value });
          }}
          className="recipe-edit__input"
        />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {ingredients.map((ingredient) => {
          return (
            <RecipeIngredientEdit
              handleIngredientChange={handleIngredientChange}
              handleIngredientDelete={handleIngredientDelete}
              key={ingredient.id}
              ingredient={ingredient}
            />
          );
        })}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          onClick={() => handleIngredientAdd()}
          className="btn btn--primary"
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
