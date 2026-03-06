"use client";

import { useState } from "react";
import type { DeliveryZone } from "@/types";
import {
  toggleDeliveryZoneAction,
  deleteDeliveryZoneAction,
  addDeliveryZoneAction,
  updateDeliveryZoneAction,
} from "@/lib/actions/admin";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeliveryZoneTable({ zones }: { zones: DeliveryZone[] }) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", order: "" });
  const [saving, setSaving] = useState(false);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    await deleteDeliveryZoneAction(deleteId);
    setDeleteId(null);
    setDeleting(false);
  }

  async function handleAdd(formData: FormData) {
    setAdding(true);
    await addDeliveryZoneAction(formData);
    setAdding(false);
  }

  function startEditing(zone: DeliveryZone) {
    setEditingId(zone._id);
    setEditForm({
      name: zone.name,
      price: String(zone.price),
      order: String(zone.order),
    });
  }

  function cancelEditing() {
    setEditingId(null);
  }

  async function handleSaveEdit() {
    if (!editingId) return;
    setSaving(true);
    const formData = new FormData();
    formData.set("id", editingId);
    formData.set("name", editForm.name);
    formData.set("price", editForm.price);
    formData.set("order", editForm.order);
    await updateDeliveryZoneAction(formData);
    setEditingId(null);
    setSaving(false);
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">שם אזור</TableHead>
            <TableHead className="w-24">מחיר</TableHead>
            <TableHead className="w-20">סדר</TableHead>
            <TableHead className="w-20">פעיל</TableHead>
            <TableHead>פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map((zone) => (
            <TableRow key={zone._id}>
              {editingId === zone._id ? (
                <>
                  <TableCell>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="h-8 w-32 border-white/10 bg-[var(--color-surface)]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="h-8 w-20 border-white/10 bg-[var(--color-surface)]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={editForm.order}
                      onChange={(e) => setEditForm({ ...editForm, order: e.target.value })}
                      className="h-8 w-16 border-white/10 bg-[var(--color-surface)]"
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={zone.active}
                      onCheckedChange={(checked) =>
                        toggleDeliveryZoneAction(zone._id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={handleSaveEdit}
                        disabled={saving}
                      >
                        {saving ? "שומר..." : "שמור"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cancelEditing}
                        disabled={saving}
                      >
                        ביטול
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>₪{zone.price}</TableCell>
                  <TableCell>{zone.order}</TableCell>
                  <TableCell>
                    <Switch
                      checked={zone.active}
                      onCheckedChange={(checked) =>
                        toggleDeliveryZoneAction(zone._id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(zone)}
                      >
                        עריכה
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(zone._id)}
                      >
                        מחיקה
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}

          {/* Inline add form */}
          <TableRow>
            <TableCell colSpan={5}>
              <form action={handleAdd} className="flex items-center gap-2">
                <Input
                  name="name"
                  placeholder="שם אזור"
                  required
                  className="h-8 w-32 border-white/10 bg-[var(--color-surface)]"
                />
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="מחיר"
                  required
                  className="h-8 w-20 border-white/10 bg-[var(--color-surface)]"
                />
                <Input
                  name="order"
                  type="number"
                  placeholder="סדר"
                  defaultValue="0"
                  className="h-8 w-16 border-white/10 bg-[var(--color-surface)]"
                />
                <label className="flex items-center gap-1 text-sm text-white/60">
                  <input type="checkbox" name="active" defaultChecked />
                  פעיל
                </label>
                <Button type="submit" size="sm" disabled={adding}>
                  {adding ? "מוסיף..." : "+ הוסף אזור"}
                </Button>
              </form>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>מחיקת אזור משלוח</DialogTitle>
            <DialogDescription>
              האם אתה בטוח שברצונך למחוק אזור משלוח זה? פעולה זו לא ניתנת לביטול.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              ביטול
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "מוחק..." : "מחק"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
