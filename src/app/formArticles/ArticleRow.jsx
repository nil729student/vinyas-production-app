// components/ArticleRow.js
import React from 'react';
import FormInput from './FormInput';

const ArticleRow = ({ article, formArticles, handleInputChange }) => {
  return (
    <tr>
      <td className="border px-4 py-2">{article}</td>
      <td className="border px-4 py-2">
        <FormInput
          name={`${article.toLowerCase()}Unitats`}
          type="number"
          value={formArticles[`${article.toLowerCase()}Unitats`]}
          onChange={handleInputChange}
          placeholder="Unitats"
        />
      </td>
      <td className="border px-4 py-2">
        <FormInput
          name={`${article.toLowerCase()}UnitatsConsum`}
          type="number"
          value={formArticles[`${article.toLowerCase()}UnitatsConsum`]}
          onChange={handleInputChange}
          placeholder="Unitats Consum"
        />
      </td>
      <td className="border px-4 py-2">
        <FormInput
          name={`${article.toLowerCase()}Pes`}
          type="number"
          value={formArticles[`${article.toLowerCase()}Pes`]}
          onChange={handleInputChange}
          placeholder="Pes"
        />
      </td>
    </tr>
  );
};

export default ArticleRow;
