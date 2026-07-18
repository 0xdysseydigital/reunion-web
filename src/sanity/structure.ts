import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const MENU_TYPES = [
  { type: "brunch", label: "Brunch" },
  { type: "lunch", label: "Lunch" },
  { type: "dinner", label: "Dinner" },
  { type: "bar", label: "Bar" },
] as const;

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Reunion Content")
    .items([
      ...MENU_TYPES.map(({ type, label }) => {
        // Sections that have at least one item belonging to this menu type.
        const sectionFilter = `_type == "menuSection" && count(*[_type == "menuItem" && references(^._id) && "${type}" in menu_type]) > 0`;

        return S.listItem()
          .title(label)
          .icon(() => "🍽️")
          .child(
            S.list()
              .title(`${label} Menu`)
              .items([
                orderableDocumentListDeskItem({
                  type: "menuSection",
                  id: `${type}-sections`,
                  title: "Sections (drag to reorder)",
                  icon: () => "↕️",
                  filter: sectionFilter,
                  S,
                  context,
                }),

                S.listItem()
                  .title("Items by Section")
                  .icon(() => "📑")
                  .child(
                    S.documentTypeList("menuSection")
                      .title("Choose a Section")
                      .filter(sectionFilter)
                      .child((sectionId) =>
                        // orderableDocumentListDeskItem() returns an already-resolved ListItem;
                        // its `.child` is the ordered document-list pane itself. Cast needed —
                        // the plugin's types and sanity/structure's ChildResolver types don't
                        // line up exactly even though this is the documented nesting pattern.
                        (orderableDocumentListDeskItem({
                          type: "menuItem",
                          id: `${type}-items-in-section-${sectionId}`,
                          title: "Items in this Section",
                          filter: `section._ref == $sectionId && "${type}" in menu_type`,
                          params: { sectionId },
                          S,
                          context,
                        }).child as unknown) as ReturnType<typeof S.documentList>
                      )
                  ),

                S.divider(),

                S.listItem()
                  .title(`All ${label} Items`)
                  .icon(() => "📋")
                  .child(
                    S.documentList()
                      .title(`All ${label} Items`)
                      .filter(`_type == "menuItem" && "${type}" in menu_type`)
                  ),
              ])
          );
      }),

      S.divider(),

      S.listItem()
        .title("Events")
        .icon(() => "📅")
        .child(
          S.list()
            .title("Events")
            .items([
              S.listItem()
                .title("Upcoming")
                .child(
                  S.documentList()
                    .title("Upcoming Events")
                    .filter('_type == "event" && date >= now()')
                    .defaultOrdering([{ field: "date", direction: "asc" }])
                ),
              S.listItem()
                .title("Past")
                .child(
                  S.documentList()
                    .title("Past Events")
                    .filter('_type == "event" && date < now()')
                    .defaultOrdering([{ field: "date", direction: "desc" }])
                ),
              S.divider(),
              S.listItem()
                .title("All Events")
                .child(
                  S.documentList()
                    .title("All Events")
                    .filter('_type == "event"')
                    .defaultOrdering([{ field: "date", direction: "desc" }])
                ),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Site Images")
        .icon(() => "🖼️")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);
