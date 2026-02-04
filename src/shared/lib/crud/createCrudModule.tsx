import * as React from 'react'
import { createRoute } from '@tanstack/react-router'
import { createCrudQueries, type CrudApi } from './createCrudQueries'

type CrudViews = {
    List: React.ComponentType
    View: React.ComponentType
    Create: React.ComponentType
    Edit: React.ComponentType
}

type CreateCrudModuleParams<T, CreateDto, UpdateDto> = {
    name: string
    api: CrudApi<T, CreateDto, UpdateDto>
    views: CrudViews
    queryClient?: any
    parentRoutes: {
        public: any
        protected: any
    }
}

export function createCrudModule<T, CreateDto, UpdateDto>({
    name,
    api,
    views,
    parentRoutes,
}: CreateCrudModuleParams<T, CreateDto, UpdateDto>) {
    const queries = createCrudQueries<T, CreateDto, UpdateDto>(name, api)

    /* ---------- PUBLIC ---------- */

    const publicBase = createRoute({
        getParentRoute: () => parentRoutes.public,
        path: name,
    })

    const listRoute = createRoute({
        getParentRoute: () => publicBase,
        path: '/',
        validateSearch: (search: Record<string, unknown>) => ({
            page: Number(search.page ?? 0),
            size: Number(search.size ?? 10),
        }),
        loader: ({ context, search }: any) =>
            context.queryClient.ensureQueryData(queries.getAll(search)),
        component: () => <views.List />,
    })

    const viewRoute = createRoute({
        getParentRoute: () => publicBase,
        path: '$id',
        loader: ({ context, params }: any) =>
            context.queryClient.ensureQueryData(
                queries.getById(params.id),
            ),
        component: () => <views.View />,
    })

    /* ---------- PROTECTED ---------- */

    const protectedBase = createRoute({
        getParentRoute: () => parentRoutes.protected,
        path: name,
    })

    const createRoute_ = createRoute({
        getParentRoute: () => protectedBase,
        path: 'create',
        component: () => <views.Create />,
    })

    const editRoute = createRoute({
        getParentRoute: () => protectedBase,
        path: '$id/edit',
        component: () => <views.Edit />,
    })

    const routesTree = {
        public: publicBase,
        protected: protectedBase,
    }

    return {
        id: name,
        routes: {
            list: listRoute,
            view: viewRoute,
            create: createRoute_,
            edit: editRoute,
        },
        routesTree,
        queries,
    }
}
