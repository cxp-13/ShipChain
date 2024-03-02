"use client"
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
// import { columns, users, statusOptions } from "@/constants/OrderTableData";
import { columns, statusOptions } from "@/constants/OrderTableDataMock"
import { capitalize } from "@/utils/index";
import { Order, OrderPopulateMealAndUser } from "@/lib/database/models/order";
import { Meal } from "@/lib/database/models/meal";
import { User as UserType } from "@/lib/database/models/user";
import { removeDuplicateOrders } from "@/utils/index";

// 订单状态
const statusColorMap: Record<string, ChipProps["color"]> = {
  success: "success",
  fail: "danger",
  loading: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["user", "id", "createAt", "amount", "status"];

type OrderTableProps = {
  orders: OrderPopulateMealAndUser[],
}

const OrderTable = ({ orders }: OrderTableProps) => {

  const addresses = removeDuplicateOrders(orders)
  console.log("addresses", addresses, "orders", orders);

  // 声明一个过滤值变量，并使用React.useState设置初始值为空字符串
  const [filterValue, setFilterValue] = React.useState("");

  // 声明一个选中的键变量，并使用React.useState设置初始值为一个空的Set
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));

  // 声明一个可见的列变量，并使用React.useState设置初始值为一个空的Set
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

  // 声明一个状态过滤变量，并使用React.useState设置初始值为all
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");

  // 声明一个选择钱包变量，并使用React.useState设置初始值为all
  const [selectWallet, setSelectWallet] = React.useState<Selection>("all");

  // 声明一个每页行数变量，并使用React.useState设置初始值为5
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "createAt",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);
  // 过滤订单展示
  const filteredItems = React.useMemo(() => {
    let filteredOrders = [...orders];
    // 搜索框
    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((order) =>
        order.meals.some(meal => meal.name.includes(filterValue))
      );
    }
    // 选择需要展示的字段
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      // 根据当前用户选择的状态数组里面，来判断order的状态有没有
      filteredOrders = filteredOrders.filter((order) =>
        Array.from(statusFilter).includes(order.status)
      );
    }
    console.log("selectWallet", selectWallet);
    // 选择需要展示的钱包
    if (selectWallet !== "all") {
      filteredOrders = filteredOrders.filter((order) => Array.from(selectWallet).includes(order.owner));
    }
    console.log("filteredOrders", filteredOrders);


    return filteredOrders;
  }, [orders, filterValue, statusFilter, selectWallet]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  // 最后一页
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: OrderPopulateMealAndUser, b: OrderPopulateMealAndUser) => {
      const first = a[sortDescriptor.column as keyof OrderPopulateMealAndUser] as number;
      const second = b[sortDescriptor.column as keyof OrderPopulateMealAndUser] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  // 每个属性对应渲染的DOM
  const renderCell = React.useCallback((order: OrderPopulateMealAndUser, columnKey: React.Key) => {
    const cellValue = order[columnKey as keyof OrderPopulateMealAndUser];
    switch (columnKey) {
      case "user": {
        if (typeof cellValue === "object" && "name" in cellValue && "avatar" in cellValue && "email" in cellValue) {
          return (
            <User
              avatarProps={{ radius: "lg", src: cellValue.avatar }}
              description={cellValue.email}
              name={cellValue.name}
            />
          );
        } else {
          return <p>null</p>
        }
      }
      case "meals": {
        if (Array.isArray(cellValue)) {
          return (
            <div>
              {cellValue.map((meal) =>
                <Chip>
                  {meal.name}
                </Chip>
              )}
            </div>
          );
        } else {
          return <p>null</p>
        }
      }

      case "id": {
        if (typeof cellValue === "number") {
          return (
            <p className="text-bold text-small">{cellValue}</p>
          );
        }
      }

      case "createAt": {
        if (typeof cellValue === "string") {
          return (
            <p className="text-bold text-small">{cellValue}</p>
          );
        }
      }
      case "amount": {
        if (typeof cellValue === "number") {
          return (
            <p className="text-bold text-small">{cellValue}</p>
          );
        }
      }
      case "status": {
        if (typeof cellValue === "string") {
          return (
            <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        }
      }
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* 查看不同钱包 */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Address
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={selectWallet}
                onSelectionChange={setSelectWallet}
              >
                {addresses.map((address) => (
                  <DropdownItem key={address}>
                    {address}
                  </DropdownItem>
                ))}

              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {orders.length} orders</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    selectWallet,
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No order found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default OrderTable