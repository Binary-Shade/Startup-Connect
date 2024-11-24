import Form from 'next/form';
import ResetForm from './ResetForm';
import { Search } from 'lucide-react';

const SearchForm = ({query}: {query?:string}) => {

    return (
        <Form action="/" scroll={false} className="search-form">
            <input
                type="text"
                name="query"
                className="search-input"
                defaultValue={query}
                placeholder="search startups"
            />
            <div className="flex gap-2">
                {
                    query && <ResetForm />
                }
                <button className='search-btn text-white'>
                    <Search className='size-5'/>
                </button>
            </div>
        </Form>
    );
};

export default SearchForm;
