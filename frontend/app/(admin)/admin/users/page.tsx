//TODO: implement export to csv if possible
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { getCurrentToken } from "@/lib/auth";
import axios from "@/lib/axios";
import { IUser } from "@/types/interfaces";

const Prodcuts = async () => {
  const { data } = await axios.get<IUser[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/v1`,
    {
      headers: {
        Authorization: `Bearer ${await getCurrentToken()}`,
      },
    }
  );

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all" className="mt-10">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage all the users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="hidden sm:table-cell">
                        <Avatar>
                          <AvatarImage src="" />
                         <AvatarFallback>
                            {user.username.at(0)! + user.username.at(-1)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.username}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.createdAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Prodcuts;
