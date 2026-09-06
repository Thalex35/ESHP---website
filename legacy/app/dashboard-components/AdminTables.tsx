import { GraduationCap, School, Users } from "lucide-react";

import { EmptyState, ErrorState } from "@/components/common/states";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClassList, useDirectory } from "@/lib/school-data";

function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-11 w-full" />
      ))}
    </div>
  );
}

/** Read-only student / teacher directory for school administrators. */
export function AdminDirectoryTable({ kind }: { kind: "students" | "teachers" }) {
  const { data, isLoading, isError, refetch } = useDirectory(kind);
  const isStudents = kind === "students";

  if (isLoading) return <TableSkeleton />;
  if (isError) {
    return (
      <ErrorState
        description={`We couldn't load the ${kind} list.`}
        onRetry={() => void refetch()}
      />
    );
  }
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={isStudents ? Users : GraduationCap}
        title={isStudents ? "No students registered yet" : "No teachers registered yet"}
        description="Records created by the school office will be listed here."
      />
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>{isStudents ? "Student ID" : "Employee no."}</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.reference}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {row.email ?? "—"}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{row.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function AdminClassesTable() {
  const { data, isLoading, isError, refetch } = useClassList();

  if (isLoading) return <TableSkeleton />;
  if (isError) {
    return <ErrorState description="We couldn't load the classes." onRetry={() => void refetch()} />;
  }
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={School}
        title="No classes created yet"
        description="Classes for the current academic year will appear here once they are created."
      />
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Academic year</TableHead>
              <TableHead className="hidden sm:table-cell">Level</TableHead>
              <TableHead className="hidden sm:table-cell">Capacity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.academic_year}</TableCell>
                <TableCell className="hidden sm:table-cell">{item.level ?? "—"}</TableCell>
                <TableCell className="hidden sm:table-cell">{item.capacity ?? "—"}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
