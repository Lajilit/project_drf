import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelectSort from "./UI/select/MySelectSort";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={(e) => setFilter('query', e.target.value.toLowerCase())}
                placeholder='Поиск...'/>

            <MySelectSort
                value={filter.sort}
                onChange={sort => setFilter('sort', sort) }
                defaultValue="Сортировка"
                options={[
                    {value: 'id', name: 'В порядке добавления'},
                    {value: 'name', name: 'По названию'},
                ]
                }
            />
            <MySelectSort
                value={filter.ascending}
                onChange={ascending => ascending === 'true' ? setFilter('ascending', true) : setFilter('ascending', false)}
                defaultValue="Порядок сортировки"
                options={[
                    {value: 'true', name: 'А-я'},
                    {value: 'false', name: 'Я-а'},
                ]
                }
            />
        </div>
    );
};

export default PostFilter;