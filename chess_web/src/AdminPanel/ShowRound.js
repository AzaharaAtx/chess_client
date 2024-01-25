import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTable, usePagination, useFilters } from 'react-table';

import '../Styles/games.css';


export const Games = () => {
    const [game, setGame] = useState([]);
    const [filteredStatus, setFilteredStatus] = useState(null);


    useEffect(() => {
        const fetchGame = async () => {
            try {
                const game = await axios.get("http://127.0.0.1:8000/api/show/create/rounds&games")
                const leaguesData = game.data;
                //const parsedData = JSON.parse(leaguesData[0]);

                setGame(leaguesData);
            } 
            catch (error) {
                console.error("Fail to fetch data", error);
            }
        };

        fetchGame();
    }, []);

    // const data = React.useMemo(() => game, [game]);
	const data = React.useMemo(() => {
		if (!filteredStatus) {
			return game;
		}
	
		return game.filter(item => item.status === filteredStatus);
	}, [game, filteredStatus]);
	

	
	const columns = React.useMemo(
		() => [
			{ Header: 'ID', accessor: 'id' },
			{ Header: 'Round ID', accessor: 'round_fk_id' },
			{ Header: 'Status', accessor: 'status' },
			{ Header: 'White Player', accessor: 'white_player_fk' },
			{ Header: 'Black Player', accessor: 'black_player_fk' },
		],
    []);		
		
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		pageOptions,
		state: { pageIndex, pageSize },
		gotoPage,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setPageSize,
		state: { filters },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 5 },
		},
			useFilters,
			usePagination
		);

	
	const onStatusChange = (e) => {
		setFilteredStatus(e.target.value);
		setPageSize(5);
		gotoPage(0);
	};

	return (
		<div className="games-container">
			<div className="filter-dropdown">
				<label>Status:</label>
				<select value={filteredStatus || ''} onChange={onStatusChange}>
					<option value="">All</option>
					<option value="Pending">Pending</option>
					<option value="Closed">Closed</option>
					<option value="In progress">In Progress</option>
				</select>
			</div>
			<table className="games-table" {...getTableProps()} style={{ width: '100%' }}>
				<thead className="thead-Table">
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map(column => (
						<th {...column.getHeaderProps()}>{column.render('Header')}</th>
					))}
					</tr>
				))}
				</thead>
				<tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row);
					return (
					<tr {...row.getRowProps()}>
						{row.cells.map(cell => (
						<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
						))}
					</tr>
					);
				})}
				</tbody>
			</table>
			<div className="pagination">
				<span>
				Page{' '}
				<strong>
					{pageIndex + 1} of {pageOptions.length}
				</strong>{' '}
				</span>
				<span>
				| Go to page:{' '}
				<input
					type="number"
					defaultValue={pageIndex + 1}
					onChange={e => {
					const page = e.target.value ? Number(e.target.value) - 1 : 0;
					gotoPage(page);
					}}
					style={{ width: '50px' }}
				/>
				</span>{' '}
				<select
				value={pageSize}
				onChange={e => {
					setPageSize(Number(e.target.value));
				}}
				>
				{[5, 10, 20].map(pageSize => (
					<option key={pageSize} value={pageSize}>
					Show {pageSize}
					</option>
				))}
				</select>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
				{'<<'}
				</button>{' '}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
				{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
				{'>'}
				</button>{' '}
				<button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
				{'>>'}
				</button>
			</div>
		</div>
	);
}

export default Games;