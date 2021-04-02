import React from "react";

export default function RecipeIngredientEdit({
  ingredient,
  handleIngredientChange,
  handleIngredientDelete,
}) {
  function handleChanges(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  }
  return (
    <>
      <input
        className="recipe-edit__input"
        value={ingredient.name}
        onChange={(e) => handleChanges({ name: e.target.value })}
        type="text"
      />
      <input
        className="recipe-edit__input"
        value={ingredient.amount}
        onChange={(e) => handleChanges({ amount: e.target.value })}
        type="text"
      />
      <button
        onClick={() => handleIngredientDelete(ingredient.id)}
        className="btn btn--danger"
      >
        &times;
      </button>
    </>
  );
}
