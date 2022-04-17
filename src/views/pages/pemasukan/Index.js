import {
    Typography,
    Card,
    Paper,
    IconButton,
    MenuIcon,
    InputBase,
    SearchIcon,
    Divider,
    DirectionsIcon,
    Pagination,
  } from "@mui/material";
  import React, { Component } from "react";
  import { Link } from "react-router-dom";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  
  const Index = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  
    return (
      <div>
        <Typography variant="h3" component="h4">
          Customer
        </Typography>
        ;
        <Card variant="elevation" sx={{ p: 3 }}>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div className="col-span-1">
              <div className="w-full flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full focus:outline-none"
                  name=""
                  id=""
                />
                <button>
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1 flex justify-end">
              <div>
                <Link
                  to="/bank/add"
                  className="px-8 py-2 rounded bg-green-600 text-white font-bold flex-1"
                >
                  Tambah +
                </Link>
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  products
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  QRT
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((val) => {
                return (
                  <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 w-10 h-10">
                          <img
                            class="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Vera Carpenter
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">Jan 21, 2020</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">43</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">Activo</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
  
          <div className="mt-3 flex md:flex-row flex-col items-center justify-between ">
            <div className="block w-full md:w-auto md:flex flex-row items-start">
              Result: &nbsp; <span className="font-medium">1-15</span> &nbsp;dari
              &nbsp;<span className="font-medium">1000</span>&nbsp; data
            </div>
            <div className="mt-3 md:mt-0 block md:flex">
              <Pagination count={10} variant="outlined" shape="rounded" />
            </div>
          </div>
        </Card>
      </div>
    );
  };
  
  export default Index;
  