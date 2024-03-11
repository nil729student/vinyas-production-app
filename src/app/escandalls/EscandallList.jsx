import React from "react";

const EscandallList = ({ escandall }) => (
    <div>
        <h2 className="text-2xl mb-4">Escandall</h2>
        <ul>
            {escandall.map((article) => (
                <>
                    <li key={article.id} className="mb-4">
                        <h3>{article.name}</h3>
                        <ul>
                            {article.children.map((child) => (
                                <li key={child.id} className="mb-2">
                                    <h4>{child.name}</h4>
                                    <ul>
                                        {child.children.map((grandchild) => (
                                            <li key={grandchild.id} className="mb-2">
                                                <h5>{grandchild.name}</h5>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                </>
            ))}
        </ul>
    </div>
);

export default EscandallList;