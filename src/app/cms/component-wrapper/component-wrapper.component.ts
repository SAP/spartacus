import {
    Component, OnInit, AfterViewInit, Input,
    ViewChild, ViewContainerRef, ComponentFactoryResolver,
    OnChanges, ChangeDetectorRef
} from '@angular/core';
import { AbstractCmsComponent } from '../abstract-cms-component';
import { ComponentMapperService } from '../component-mapper.service';



@Component({
    selector: 'y-component-wrapper',
    templateUrl: './component-wrapper.component.html',
    styleUrls: ['./component-wrapper.component.scss']
})
export class ComponentWrapperComponent implements OnInit, AfterViewInit {

    @ViewChild('target', {read: ViewContainerRef}) target;
    @Input() componentType: string;
    @Input() componentUid: string;
    @Input() contextParameters: any;


    private isViewInitialized = false;
    cmpRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef,
        private componentMapper: ComponentMapperService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.launchComponent();
    }

    // ngOnChanges() {
    //     this.updateComponent();
    // }

    launchComponent() {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }

        const componentTypeClass = this.componentMapper.getComponentTypeByCode(this.componentType);
        if (componentTypeClass) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeClass);
            this.cmpRef = this.target.createComponent(factory);
            const instance: AbstractCmsComponent = this.cmpRef.instance;
            if (instance.setUid) {
                instance.setUid(this.componentUid);
            }
            // pass parameters to dynamic component
            if (this.contextParameters && instance.setContextParameters) {
                instance.setContextParameters(this.contextParameters);
            }
            this.cdRef.detectChanges();
        }
    }

}