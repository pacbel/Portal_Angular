import {
  CollectionViewer,
  SelectionChange,
  DataSource
} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public isLoading = false
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  dataMap = new Map<string, string[]>([
    ['Integrar', ['../assets/blog/nenhum.md']],
    ['Ambiente Tenco', ['../assets/blog/nenhum.md']],
    ['Boleto Split', ['../assets/blog/nenhum.md']],
    ['Sistema de Cobrança', ['../assets/blog/nenhum.md']],
    ['App Auditoria', ['../assets/blog/nenhum.md']],
    [
      'Portal de Vendas',
      ['../assets/blog/DeclaracaoVendas.md', 'White', 'Purple']
    ],
    ['Integração Sales Force', ['../assets/blog/nenhum.md']],
    ['Importação de XML', ['../assets/blog/nenhum.md']],
    ['Cobrança Banco ABC', ['../assets/blog/nenhum.md']],
    ['Cobrança BASA', ['../assets/blog/nenhum.md']]
  ]);

  rootLevelNodes: string[] = [
    'Integrar',
    'Ambiente Tenco',
    'Boleto Split',
    'Sistema de Cobrança',
    'App Auditoria',
    'Portal de Vendas',
    'Integração Sales Force',
    'Importação de XML',
    'Cobrança Banco ABC',
    'Cobrança BASA'
  ];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    public treeControl: FlatTreeControl<DynamicFlatNode>,
    public database: HelpService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          name =>
            new DynamicFlatNode(
              name,
              node.level + 1,
              this.database.isExpandable(name)
            )
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}
