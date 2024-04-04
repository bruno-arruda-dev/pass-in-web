import { ChangeEvent, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react';
import { IconButton } from './icon-button';
import { Table } from './tabble/table';
import { TableHeader } from './tabble/table-header';
import { TableCell } from './tabble/table-cell';
import { TableRow } from './tabble/table-row';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

type Attendee = {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}

export function AttendeeList() {
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / 10);
    const [attendees, setAtendees] = useState<Attendee[]>([]);
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString());

        if (url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? '';
        }

        return '';
    });
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString());

        if (url.searchParams.has('page')) {
            return (Number(url.searchParams.get('page')));
        }

        return 1;
    });

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString());
        url.searchParams.set('page' , String(page));
        window.history.pushState({}, '', url);
        setPage(page);
    }

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString());
        url.searchParams.set('search' , search);
        window.history.pushState({}, '', url);
        setSearch(search);
    }
    
    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees');
        url.searchParams.set('pageIndex', String(page - 1));
        

        if (search.length > 0) {
            url.searchParams.set('query', search);
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAtendees(data.attendees);
                setTotal(data.total);
            })
            .catch(err => {
                console.log(err);
            })
    }, [page, search])


    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value);
        setPage(1)
    }

    // function goToNextPage() {
    //     setCurrentPage(page + 1);
    // }

    // function goToPreviousPage() {
    //     setCurrentPage(page - 1);
    // }

    // function goToFirstPage() {
    //     setCurrentPage(1);
    // }

    // function goToLastPage() {
    //     setCurrentPage(totalPages);
    // }

    return (
        <div className="flex flex-col gap-4">

            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className='size-4 text-emerald-300' />
                    <input
                    value={search}
                        onChange={onSearchInputChanged}
                        placeholder="Buscar participante..."
                        className="flex-1 h-auto p-0 text-sm bg-transparent border-0 outline-none focus:ring-0"
                    />
                </div>
            </div>

            <Table>


                <thead>
                    <tr className='border-b border-white/10'>
                        <TableHeader style={{ width: 48 }}>
                            <input type='checkbox' className='rounded size-4 bg-black/20' />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de  inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </tr>
                </thead>

                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id} className='border-b border-white/10 hover:bg-white/5'>
                                <TableCell><input type='checkbox' className='rounded size-4 bg-black/20' /></TableCell>
                                <TableCell>{attendee.id}</TableCell>

                                <TableCell>
                                    <div className='flex flex-col gap-1'>
                                        <span className='font-semibold text-white'>{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>

                                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{attendee.checkedInAt === null
                                    ? <span className='text-zinc-500'>Não fez check-in</span>
                                    : dayjs().to(attendee.checkedInAt)}
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className='size-4' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>

                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando {attendees.length} de {total} itens
                        </TableCell>
                        <TableCell colSpan={3} className='text-right'>
                            <div className='inline-flex items-center gap-8'>
                                <span>Página {page} de {totalPages}</span>

                                <div className='flex gap-1.5'>
                                    <IconButton onClick={() => setCurrentPage(1)} disabled={page === 1} className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                        <ChevronsLeft className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={() => setCurrentPage(page - 1)} disabled={page === 1} className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                        <ChevronLeft className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={() => setCurrentPage(page + 1)} disabled={page === totalPages} className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                        <ChevronRight className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={() => setCurrentPage(totalPages)} disabled={page === totalPages} className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                        <ChevronsRight className='size-4' />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>

            </Table>

        </div>
    )
}